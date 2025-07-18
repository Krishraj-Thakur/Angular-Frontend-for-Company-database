import { Component, ViewChild } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [MatTableModule,MatGridListModule,MatCardModule, MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  prTypecounts: { [key: string]: number } = {};
  assetCount=0;
  serviceCount=0;
  sourceCount=0;

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

      this.assetCount = 0;
      this.serviceCount = 0;
      this.sourceCount = 0;

      for( const row of data){
        const name = row?.prtypeNavigation?.typeName?.toLowerCase();
        if(name === 'asset') {
          this.assetCount++;
        }
        else if(name === 'service') {
          this.serviceCount++;
        }
        else if(name === 'source') {
          this.sourceCount++;
        }
        console.log('Asset Count:', this.assetCount);
        console.log('Service Count:', this.serviceCount);
        console.log('Source Count:', this.sourceCount);
      }
      //use mattables to configure how data will be shown 
    });
  }
  
}
