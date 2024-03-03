import { Component, OnInit } from '@angular/core';
import { InstallationService } from './installation-content-data.service';

@Component({
  selector: 'app-installation-content',
  templateUrl: './installation-content.component.html',
  styleUrls: ['./installation-content.component.scss']
})
export class InstallationContentComponent implements OnInit {
  folders: any;
  loading = true;

  constructor(private installationService: InstallationService) { }

  ngOnInit(): void {
    this.installationService.getFileFlows().subscribe(data => {
      setTimeout(() => {
        this.loading = false;
        this.folders = data;
      },1000);      
    });
  }
}
