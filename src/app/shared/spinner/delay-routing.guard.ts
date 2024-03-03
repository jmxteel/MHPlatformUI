// delay-routing.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})

export class DelayRoutingGuard implements CanActivate {
  constructor(private spinnerService: SpinnerService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    this.spinnerService.showSpinner();
    // Wait for 2 seconds
    await this.spinnerService.waitForSpinner(1000);
    this.spinnerService.hideSpinner();
    return true; // Proceed with route activation
  }
}