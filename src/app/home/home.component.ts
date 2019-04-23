import { Component, OnInit } from "@angular/core";
import { QuoteDataService } from "../quote-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  allQuotes: Array<Object> = [];
  quoteForm: FormGroup;
  quotesCreated = Array(localStorage.getItem("created_quotes")) || [];
  submitted: Boolean = false;
  submissionType: Boolean = false;
  reloadFunction: Function;

  constructor(
    private qds: QuoteDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.quoteForm = this.formBuilder.group({
      author: ["", Validators.required],
      quote: ["", Validators.required]
    });
    this.local_getquotes();
    this.reloadFunction = this.local_getquotes.bind(this);
  }

  local_getquotes() {
    this.qds.getQuotes().subscribe(d => {
      // this.allQuotes = d.data;
      this.allQuotes = this.allQuotes.sort((q1, q2) => {
        var a = new Date(q1.created_at);
        var b = new Date(q2.created_at);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    });
  }

  sendQuote() {
    // e.preventDefault();
    this.submitted = true;
    var at = this.quoteForm.controls.author.value;
    var q = this.quoteForm.controls.quote.value;
    console.log(at, q);
    if (at != "" && q != "") {
      this.qds.sendQuote(at, q).subscribe(data => {
        this.local_getquotes();
        this.quoteForm.controls.author.setValue("");
        this.quoteForm.controls.quote.setValue("");
        this.quotesCreated.push(data._id);
        localStorage.setItem("created_quotes", this.quotesCreated.toString());
        console.log(this.quotesCreated);
      });
      this.submissionType = true;
    } else {
      this.submissionType = false;
    }

    console.log(this.submitted, this.submissionType);
    setTimeout(() => {
      this.submitted = false;
    }, 3000);
  }
}
