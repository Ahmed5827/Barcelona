import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us-our-sponsor',
  imports: [],
  templateUrl: './about-us-our-sponsor.html',
  styleUrl: './about-us-our-sponsor.css'
})
export class AboutUsOurSponsor {

  sponsors = [
    {
      name: 'Nike',
      logo: '/Logo_NIKE.svg',
    },
    {
      name: 'Spotify',
      logo: '/spotify-logo.png',
    },
    {
      name: 'Philips Ambilight TV',
      logo: '/ambilight-Photoroom.png',
    },
    {
      name: 'PRIME',
      logo: '/Prime_Hydration_logo.png',
    },
    {
      name: 'whitebit',
      logo: '/Whitebit.png',
    },
    {
      name: 'Konami',
      logo: '/Konami-Logo.wine.png',
    }
    ]
}
