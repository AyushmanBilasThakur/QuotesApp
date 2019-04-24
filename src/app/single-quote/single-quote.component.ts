import { Component, OnInit, Input } from "@angular/core";
import { QuoteDataService } from "../quote-data.service";

@Component({
  selector: "app-single-quote",
  templateUrl: "./single-quote.component.html",
  styleUrls: ["./single-quote.component.scss"]
})
export class SingleQuoteComponent implements OnInit {
  @Input() quote: object;
  @Input() reloadFunction: Function;
  author: boolean = false;
  copied: boolean = false;
  already_interacted: boolean = false;
  quotesThisDevice = [];
  likedOnThisDevice = [];
  constructor(private qds: QuoteDataService) {}

  ngOnInit() {
    if (localStorage.getItem("liked_quotes") != null) {
      this.likedOnThisDevice = localStorage.getItem("liked_quotes").split(",");
      this.likedOnThisDevice.forEach(element => {
        if (element.toString() == this.quote._id) {
          this.already_interacted = true;
        }
      });
    } else {
      localStorage.setItem("liked_quotes", "");
    }

    if (localStorage.getItem("created_quotes") != null) {
      this.quotesThisDevice = localStorage.getItem("created_quotes").split(",");
    } else {
      localStorage.setItem("created_quotes", this.quotesThisDevice.toString());
    }
    this.quotesThisDevice.forEach(element => {
      if (element.toString() == this.quote._id) {
        this.author = true;
      }
    });
  }

  copyToClipboard() {
    console.log("called");
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
    const el = document.createElement("textarea");
    el.value = `"${this.quote.quote}" by ${
      this.quote.author
    }, Find out more such quotes at @ https://AyushmanBilasThakur.github.io/QuotesApp/`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  delete() {
    this.qds.deleteQuote(this.quote._id).subscribe(data => {
      console.log("Deleted!");
      this.reloadFunction();
    });
  }

  like() {
    this.qds.likeQuote(this.quote._id).subscribe(data => {
      console.log("Liked");
      this.reloadFunction();
      this.likedOnThisDevice.push(this.quote._id);
      console.log(this.likedOnThisDevice);
      localStorage.setItem("liked_quotes", this.likedOnThisDevice.toString());
    });
  }

  dislike() {
    console.log("cliked");
    this.qds.dislikeQuote(this.quote._id).subscribe(data => {
      console.log("Disliked");
      this.reloadFunction();
      this.likedOnThisDevice.push(this.quote._id);
      localStorage.setItem("liked_quotes", this.likedOnThisDevice.toString());
    });
  }
}
