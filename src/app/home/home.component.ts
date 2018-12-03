import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute,  Router} from '@angular/router';
import {  ApiService} from '../api.service';
import {  Post} from '../shared/posts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  datapost: Post[] = [];
  dataportfolio: Post[] = [];
  dataservice: Post[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    console.log(this.route.snapshot.params['type']);
    const pageTitle = this.route.snapshot.params['type'];
    console.log('pageTitle ', pageTitle);
    this.api.getPosts('posts')
      .subscribe(res => {
        this.datapost = res;
        console.log(this.datapost);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
      // *********** */
      this.api.getPosts('service')
      .subscribe(res => {
        this.dataservice = res;
        console.log(this.dataservice);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
      // *********** */
      this.api.getPosts('portfolio')
      .subscribe(res => {
        this.dataportfolio = res;
        console.log(this.dataportfolio);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  getPostImage(id) {
    const image = './assets/large.jpg';
    /* this.api.getMedia(id).subscribe(data => {
      return data;
    }); */
    return image; 1;
  }



}
