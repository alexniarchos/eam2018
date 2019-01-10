import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentsService } from './students.service';
import { Router, ActivatedRoute} from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('f') exhangeForm: NgForm;
  @ViewChild('declaration') declarationForm: NgForm;
  constructor(private sessionSt:SessionStorageService,private studentSer:StudentsService, private router:Router,private route: ActivatedRoute) { }
  page='';
  change=0;
  user: any;
  university: any;
  department: any;
  booksofthisseason: any[]=[];
  historyoforders: any[]=[];
  exhangebooks: any[]=[];
  book1: string;
  book2: string;
  book3: string;
  book4: string;
  book5: string;
  book6: string;
  book7: string;
  ngOnInit() {
    this.page=this.route.snapshot.paramMap.get('type');
    if(this.page=='details'){
      this.studentSer.getdetails().subscribe(
        (res:any)=>{
          this.user=res;
          }
      );
      this.studentSer.getuniversity().subscribe(
        (res:any)=>{
          this.university=res;
          }
      );
      this.studentSer.getdepartment().subscribe(
        (res:any)=>{
          this.department=res;
          }
      );
    }
    if(this.page=='declaration'){
      this.studentSer.getseasonbooks().subscribe(
        (res:any[])=>{
          this.booksofthisseason=res;
        }
      )
    }
    if(this.page=='history'){
      this.studentSer.gethistory().subscribe(
        (res:any[])=>{
          this.historyoforders=res;
        }
      )
    }
    if(this.page=='exhange'){
      this.studentSer.getavailablebookstoexhange().subscribe(
        (res:any[])=>{
          this.exhangebooks=res;
        }
      )
    }
  }

  

  onDeclarationConfirm(){
    var loginState = this.sessionSt.retrieve('loginState')
    if(loginState != true){
      this.router.navigate(["login"])
    }
    else{
      this.page = "confirmation"
      this.studentSer.declareBooks(this.book1,this.book2,this.book3,this.book4,this.book5,this.book6,this.book7).subscribe()
    }
  }

  onSelectBook(bookId){
    console
    var books = []
    books[bookId] = bookId
  }

  onSubmitexhange(){
    this.studentSer.exhangebooks(this.exhangeForm.value.name).subscribe(
      res=>{
        if(res==true)
          this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>this.router.navigate(["students/details"])); 
      }
    )
  }
}
