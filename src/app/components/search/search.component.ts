import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, takeWhile, filter, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();
  faSearch = faSearch;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ search: '' });
  }

  ngOnInit() {
    this.onFormChanges();
  }

  private onFormChanges() {
    this.form.controls['search'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(() => {
          const userTriggered = this.form.dirty;
          return userTriggered;
        }),
      )
      .subscribe(() => {
        this.search();
      });
  }



  search() {
    const searchTerm = this.form.controls.search.value;
    this.form.markAsPristine();
    this.searched.emit(searchTerm || undefined);
  }

  clearWithoutEmit(): void {
    this.form.setValue({ search: '' });
  }

}
