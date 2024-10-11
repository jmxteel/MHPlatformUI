import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import tippy, { hideAll } from 'tippy.js';

@Component({
  selector: 'app-cell-menu-renderer',
  templateUrl: './cell-menu-renderer.component.html',
  styleUrls: ['./cell-menu-renderer.component.scss']
})
export class CellMenuRendererComponent implements AfterViewInit {
  private params: any;
  isOpen = false;
  private tippyInstance: any;

  @ViewChild('content') container: any;

  @ViewChild('trigger') button: any;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.tippyInstance = tippy(this.button.nativeElement);
    this.tippyInstance.disable();
  }

  agInit(params: any) {
    this.params = params;
  }

  onClickHandler(option: any) {
    this.togglePopup();
    if (option === 'create') {
      this.params.api.applyTransaction({
        add: [{}],
      });
    }
    if (option === 'delete') {
      this.params.api.applyTransaction({ remove: [this.params.data] });
    }

    if (option === 'edit') {
      this.params.api.startEditingCell({
        rowIndex: this.params.rowIndex,
        colKey: 'make',
      });
    }
  }

  configureTippyInstance() {
    this.tippyInstance.enable();
    this.tippyInstance.show();

    //see documentation for 'placement' in tippy.js
    this.tippyInstance.setProps({
      trigger: 'manual',
      placement: 'left',
      arrow: false,
      interactive: true,
      appendTo: document.body,
      hideOnClick: false,
      onShow: (instance: any) => {
        hideAll({ exclude: instance });
      },
      onClickOutside: (instance: any, event: any) => {
        this.isOpen = false;
        instance.unmount();
      },
    });
  }

  togglePopup() {
    this.isOpen = !this.isOpen;
    this.changeDetector.detectChanges();
    if (this.isOpen) {
      this.configureTippyInstance();
      this.tippyInstance.setContent(this.container.nativeElement);
    } else {
      this.tippyInstance.unmount();
    }
  }
}
