import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstallationDataService } from './installation-content-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrls: ['./installation-content.component.scss']
})
export class InstallationContentComponent implements OnInit, OnDestroy {
  folders: any;
  loading = true;
  private subscription: Subscription | undefined;

  constructor(private installationService: InstallationDataService,) { }

  ngOnInit(): void {
    this.subscription = this.installationService.getFileFlows().subscribe(data => {
      setTimeout(() => {
        this.loading = false;
        this.folders = data;
      },1000);      
    });
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe(); 
  }
}
