import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Post } from '../shared/posts';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post = { _id: '', title: '', rendered: ''};
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);

 const pageTitle = this.route.snapshot.params['type'];
    this.getPostDetails(this.route.snapshot.params['type'], this.route.snapshot.params['id']);
  }

  getPostDetails(type, id) {

    this.api.getPost(type, id)
      .subscribe(data => {
        this.post = data;
        console.log(this.post);
        this.isLoadingResults = false;
      });


}



}
