import { Component } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [MatTableModule,MatToolbar,MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'sn',
    'refNum',
    'prtype',
    'company',
    'prComsumed',
    'currency',
    'remarks'
  ];
  dataSource: any[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    console.log('Hi');
    this.commonService.getPurchaseRequests().subscribe(data => {
      this.dataSource = data;
      //use mattables to configure how data will be shown 
    });
  }
}
