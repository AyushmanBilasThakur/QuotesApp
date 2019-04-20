import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QuoteDataService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  getQuotes() {
    return this.http.get("https://quotesapp-backend.herokuapp.com/quotes");
  }

  sendQuote(author: string, quote: string) {
    var quoteObject = {
      author: author,
      quote: quote
    };
    console.log(quoteObject);
    return this.http.post(
      "https://quotesapp-backend.herokuapp.com/quotes",
      quoteObject,
      this.httpOptions
    );
  }

  deleteQuote(id) {
    var uri = `https://quotesapp-backend.herokuapp.com/quotes/${id}/delete`;
    return this.http.get(uri);
  }

  likeQuote(id) {
    var uri = `https://quotesapp-backend.herokuapp.com/quotes/${id}/like`;
    return this.http.get(uri);
  }

  dislikeQuote(id) {
    var uri = `https://quotesapp-backend.herokuapp.com/quotes/${id}/dislike`;
    return this.http.get(uri);
  }
}
