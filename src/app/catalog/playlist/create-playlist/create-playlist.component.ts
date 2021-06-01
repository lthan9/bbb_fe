//import from angular core
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
import {FormGroup,FormBuilder,Validators} from "@angular/forms"
// import from services
import { SortParameter, PagedSortResponse } from "app/services/dto-base";
import { PlaylistHttpClient } from "app/services/playlist/playlist-service";

//import from ui lib
import { MatSort } from "@angular/material/sort";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';

// import from utils
import { lang } from "../../../@language/language";
@Component({
  selector: "ngx-create-playlist",
  templateUrl: "./create-playlist.component.html",
  styleUrls: ["./create-playlist.component.scss"],
})
export class CreatePlaylistComponent implements OnInit {
 

  //public variables
  lang = lang;
  isLoading = true;
  service:any;
  imageURL:string;
  thumbnail = {data:null,fileName:""}
  playlistIdCreated:number

  //form data
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;

  constructor(public playlistService: PlaylistHttpClient,private _formBuilder: FormBuilder) {
    this.service = playlistService
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      description:['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onClickPlaylist(playlistId:any)
  {
    this.playlistService.getById(playlistId).then(res=>{
    })
  }

  showPreview(event) {
    //const file = (event.target as HTMLInputElement).files[0];

    // this.firstFormGroup.patchValue({
    //   thumbnail: file
    // });
    // this.firstFormGroup.get('thumbnail').updateValueAndValidity()

    // File Preview
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
			this.imageURL = reader.result as string; 
		}
    this.thumbnail = {
      data: event.target.files[0],
      fileName: event.target.files[0].name,
    };

  }
  pickFile(e:any)
  {
    document.getElementById("fileImg").click();

  }

  // Submit Form
  create() {
    let name = this.firstFormGroup.get('name').value
    let des = this.firstFormGroup.get('description').value
    console.log(name)
    this.playlistService.create(name,des,this.thumbnail).then(res=>{
      console.log(res)
      this.playlistIdCreated = res.objectId
      this.isEditable = true;
    })
  }
}
