import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [

  { path: '',
  component: HomeComponent,
  data: { title: 'Welcome Home' }
  },
  {
    path: ':type',
    component: PostsComponent,
    data: { title: 'Blog' }
  },
  {
    path: ':type/:id/:slug',
    component: PostDetailComponent,
    data: { title: 'Post Details' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
