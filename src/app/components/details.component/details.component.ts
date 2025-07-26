import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../dashboard.component/dashboard.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details.component',
  imports: [DatePipe, MatTableModule, MatGridListModule, MatCardModule, MatPaginatorModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {


  displayedDashboardColumns: string[] = [
    'sn',
    'refNum',
    'prtype',
    'company',
    'prComsumed',
    'currency',
    'remarks'
  ];


  displayedColumns: string[] = [
    'prId',
    'matId',
    'availableQuantity',
    'deliveryDate',
    'currentStatus'
  ];

  prdatasource = new MatTableDataSource<any>();
  dataSource = new MatTableDataSource<any>();


  prGeneralDisplayedColumns: string[] = ['label', 'value'];
  prGeneralDataSource = new MatTableDataSource<any>();

  // Define any properties or methods needed for the details component
  // For example, you might want to fetch details based on an ID from the route

  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Initialize the component, fetch data, etc.
    const sn = Number(this.route.snapshot.paramMap.get('sn'));
    console.log('SN from route:', sn);
    const targetPrid = sn + 3;
    console.log('Target PR ID:', targetPrid);

    /*
    this.commonService.getPurchaseRequests().subscribe(data => {
      console.log('Purchase Requests:', data);
      const filtered = data.filter(row => row.id === targetPrid);
      console.log('Filtered data for purchase request:', filtered);
      this.prdatasource.data = filtered;
      */

      this.commonService.getPurchaseRequests().subscribe(data => {
    const row = data.find(item => item.id === targetPrid);
      if (row) {
      this.prGeneralDataSource.data = [
        { label: 'S/N', value: sn },
        { label: 'Reference No', value: row.refNum },
        { label: 'PR Type', value: row.prtype },
        { label: 'Company', value: row.company },
        { label: 'PR Consumed', value: row.prComsumed },
        { label: 'Currency', value: row.currency },
        { label: 'Remarks', value: row.remarks },
      ];
    }
      // You can set the dataSource here if needed
      // this.dataSource.data = filtered;
    });

    this.commonService.getPRItemDetails().subscribe(data => {
      console.log('Full response:', data);
      const filtered = data.filter(row => row.prId === targetPrid);
      console.log('Filtered data:', filtered);
  
  this.dataSource.data = filtered;
      
    });
  }

  // Add methods to handle data fetching or other logic as needed
  goBack() {
    // Logic to navigate back to the dashboard
    window.history.back();
  }
}
