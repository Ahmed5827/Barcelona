import { Component } from '@angular/core';
import { AboutUsOurHistory } from "../components/about-us-our-history/about-us-our-history";
import { AboutUsOurSponsor } from "../components/about-us-our-sponsor/about-us-our-sponsor";
import { AboutUsOurStadium } from "../components/about-us-our-stadium/about-us-our-stadium";
import { AboutUsComponent } from "../components/about-us-component/about-us-component";
import { Footer } from "../components/footer/footer";

@Component({
  selector: 'app-about-us',
  imports: [AboutUsOurHistory, AboutUsOurSponsor, AboutUsOurStadium, AboutUsComponent],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
