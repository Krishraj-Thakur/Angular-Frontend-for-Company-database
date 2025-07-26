import { Component, ViewChild } from '@angular/core';
import { CommonService } from '../../Service/common.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgClass } from '@angular/common';
import { provideRouter, Router } from '@angular/router';
import { DetailsComponent } from '../details.component/details.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateRequestDialogComponents } from '../create-request-dialog.components/create-request-dialog.components';


@Component({
  selector: 'app-dashboard.component',
  standalone: true,
  imports: [MatTableModule, MatGridListModule, MatCardModule, MatPaginatorModule, NgClass, MatIcon, CreateRequestDialogComponents],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  prTypecounts: { [key: string]: number } = {};
  assetCount = 0;
  serviceCount = 0;
  sourceCount = 0;

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

  constructor(private commonService: CommonService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    console.log('Hi');
    this.commonService.getPurchaseRequests().subscribe(data => {
      this.dataSource = data;


      this.assetCount = 0;
      this.serviceCount = 0;
      this.sourceCount = 0;

      for (const row of data) {
        const name = row?.prtypeNavigation?.typeName?.toLowerCase();
        if (name === 'asset') {
          this.assetCount++;
        }
        else if (name === 'service') {
          this.serviceCount++;
        }
        else if (name === 'source') {
          this.sourceCount++;
        }
        console.log('Asset Count:', this.assetCount);
        console.log('Service Count:', this.serviceCount);
        console.log('Source Count:', this.sourceCount);
      }
      //use mattables to configure how data will be shown 
    });
  }

  gotodetails(sn: number) {
    // Navigate to the details page with the selected ID
    this.router.navigate(['/details', sn]);
  }

  fetchDashboardData() {
    this.commonService.getPurchaseRequests().subscribe(data => {
      this.dataSource = data;
      // update other counts here if needed
    });
  }

  openCreateRequestDialog(): void {
    const dialogRef = this.dialog.open(CreateRequestDialogComponents, {
      width: '1000px',
      // You can pass data if needed using data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commonService.postCreateRequest(result).subscribe({
          next: (res) => {
            console.log('Created successfully:', res);
            this.fetchDashboardData(); // Refresh the table with new row
            dialogRef.close();
          },
          error: (err) => {
            console.error('Failed to create request:', err);
          }
        });
      }
    });
  }

}
