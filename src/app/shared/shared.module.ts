import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './services/snackbar.service';
import { UtilityService } from './services/utility.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FuseMediaWatcherService } from './module/media-watcher/media-watcher.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SearchPipe } from './pipes/search.pipe';


const modules = [
  CommonModule,
  MatCheckboxModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule
]

const components = [

]

const pipes = [
  SearchPipe
]

@NgModule({
  declarations: [
    ...pipes
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...pipes
  ],
  providers: [SnackbarService, UtilityService, FuseMediaWatcherService]
})
export class SharedModule { }
