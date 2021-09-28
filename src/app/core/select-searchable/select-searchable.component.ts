/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SelectionType } from 'src/interfaces/shared-enums.enum';

@Component({
  selector: 'app-select-searchable',
  templateUrl: './select-searchable.component.html',
  styleUrls: ['./select-searchable.component.scss'],
})
export class SelectSearchableComponent implements OnInit {
  @ViewChild('optionsContainer') optionsContainer;

  @Input() inputConfig: {
    labelInput: string;
    searchText: string;
    showResults: boolean;
    dataName: string;
    properties: {};
    func: () => void;
    selectionType: SelectionType;
    selected?: Array<any>;
    data: Array<any>;
    page: number;
    totalOfPages: number;
    limit: number;
  };

  deltaScroll = 545;
  lastScroll = 0;
  stopScroll = false;

  constructor() {}

  ngOnInit() {}

  async search(getData: () => void) {
    this.inputConfig.page = 1;
    this.inputConfig.data = [];
    await getData();
  }

  async onScroll(event) {
    let down = true;

    if (this.lastScroll > event.target.scrollTop) {
      down = false;
    } else {
      down = true;
    }

    const delta = (event.target.scrollHeight - event.target.clientHeight) * 0.6;
    const deltaLast = event.target.scrollTop - this.lastScroll;
    if (down && event.target.scrollTop >= delta && !this.stopScroll) {
      this.stopScroll = true;
      if (this.inputConfig.page <= this.inputConfig.totalOfPages) {
        await this.getMore(this.inputConfig.func);
        this.stopScroll = false;
      }
    }

    this.lastScroll = event.target.scrollTop;
  }

  async getMore(getData: () => void) {
    return new Promise(async (resolve, reject) => {
      try {
        this.inputConfig.page++;
        await getData();

        resolve('more');
      } catch (err) {
        reject(err);
      }
    });
  }

  checkIonInputEvent(event) {
    console.log('IONINPUT');
    this.search(this.inputConfig.func);
  }

  checkFocusEvent(event) {
    console.log('FOCUS EVENT', event.target.value);
    this.search(this.inputConfig.func);
  }

  selectItem(item) {
    item.selected = true;
    if (this.inputConfig.selectionType === SelectionType.SINGLE) {
      this.inputConfig.selected = [...this.inputConfig.selected, item];
      this.inputConfig.searchText = item[this.inputConfig.properties['text']];
      this.inputConfig.showResults = false;
      return;
    }

    this.inputConfig.selected = [...this.inputConfig.selected, item];
  }

  @HostListener('document:click', ['$event'])
  private documentClickHandler(event) {
    if (event.target.id === 'optionItem') {
      if (this.inputConfig.selectionType === SelectionType.SINGLE) {
        this.inputConfig.showResults = false;
      }

      return;
    } else if (
      event.target.name &&
      event.target.name.includes('searchTextAutocomplete') &&
      this.inputConfig.showResults === true
    ) {
      return;
    } else {
      this.inputConfig.showResults = false;
    }
  }
}
