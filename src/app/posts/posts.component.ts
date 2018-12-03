import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  ApiService
} from '../api.service';
import {
  Post
} from '../shared/posts';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Post[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit() {
    console.log(this.route.snapshot.params['type']);
    const pageTitle = this.route.snapshot.params['type'];
    console.log('pageTitle ', pageTitle);
    this.api.getPosts(pageTitle)
      .subscribe(res => {
        this.data = res;
        this.data.posts.forEach(function (value) {
         // console.log(value);
        });
        console.log(this.data);
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
    return image;1
  }



}
