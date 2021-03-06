import { Component, OnInit } from '@angular/core';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';
import {PostDataSource} from '../dashboard/dashboard.component';
import {SolrService} from '../solr.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  // chatHistoryPath = 'F:\\Belgelerim\\doktora\\21_22 spring\\596\\dataset\\ubuntu_dialogs_full';
  question = 'how to reboot ubuntu operating system';
  displayedColumns = ['date', 'summary', 'score', 'action'];
  dataSource = [
  //   {
  //   id: '123',
  //   date: '2004-11-23T09:49:00Z',
  //   question: 'abc'
  // }
  ];
  anySearch = false;
  isLoading = false;
  constructor(public solrService: SolrService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  search(): void {
    console.log(this.question);
    this.dataSource = [];
    this.isLoading = true;
    this.anySearch = true;

    this.solrService.getDocuments(this.question).subscribe(response => {
      this.dataSource = response.response.docs;
      this.isLoading = false;
    });
  }

  openDetails(data): void {
    console.log(data);
    data.text = '-> ' + data.text.replaceAll('\n', '\n-> ');
    data.text = data.text.substr(0, (data.text.length - 3));
    this.dialog.open(PostDialogComponent, {
      width: '900px',
      data
    });
  }

}
