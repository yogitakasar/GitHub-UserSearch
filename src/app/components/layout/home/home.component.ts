import { CommonService } from './../../../services/common.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  users:any = [];
  currentPage:number = 1;
  perPage:number = 15;
  searchStr:String =''
  isLoading:boolean=false


  constructor(private activatedRoute:ActivatedRoute,
    private commonService:CommonService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.searchStr=params['search'];
      this.users = [];
      this.loadUsers();
    })
    window.addEventListener('scroll', this.onScroll, true);

  }


  loadUsers(){
    this.isLoading = true;
    this.commonService.getUsers(this.searchStr,this.currentPage,this.perPage).subscribe((users:any)=>{
      console.log(users)
      this.users = this.users.concat(users.items);
      this.isLoading=false;
    })
  }

  ngOnDestroy():void{
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onScroll = (): void => {

    if ((window.innerHeight + window.scrollY >= document.body.scrollHeight)&& !this.isLoading) {
      this.currentPage+=1
      this.loadUsers();
    }
  }

}
