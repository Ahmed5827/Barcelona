import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Playerservice } from '../services/players/playerservice';
import { player, Response, Country, Place } from '../interfaces/player';

// Import Player interface from squad
interface SquadPlayer {
  id: number;
  name: string;
  photo: string;
  number: number;
  age: number;
  position: any; // Position enum from squad
}

@Component({
  selector: 'app-player',
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private playerService = inject(Playerservice);
  private routeSubscription?: Subscription;
  
  // Convert to signals
  playerId = signal<number>(0);
  playerData = signal<player | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  
  // Player info from navigation state
  playerInfo = signal<SquadPlayer | null>(null);

  // Expose enums to template
  Place = Place;
  Country = Country;

  // Convert getters to computed signals
  winCount = computed(() => {
    const data = this.playerData();
    if (!data) return 0;
    return data.response.filter(trophy => trophy.place === Place.Winner).length;
  });

  runnerUpCount = computed(() => {
    const data = this.playerData();
    if (!data) return 0;
    return data.response.filter(trophy => trophy.place === Place.The2NdPlace).length;
  });

  // Computed signal to check if we have player data
  hasPlayerData = computed(() => {
    const data = this.playerData();
    return data?.response && data.response.length > 0;
  });

  ngOnInit() {
    // Get player info from history state
    const state = history.state;
    console.log('Navigation state:', state);
    
    if (state && state.id && state.name && state.photo) {
      this.playerInfo.set(state as SquadPlayer);
      console.log('Player info loaded from state:', state);
    }

    // Subscribe to route parameter changes
    this.routeSubscription = this.route.params.subscribe(params => {
      const newPlayerId = +params['id'];
      console.log('Route params received:', params, 'Player ID:', newPlayerId);
      
      // Always update the player ID and reload
      this.playerId.set(newPlayerId);
      this.loadPlayerTrophies();
    });
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadPlayerTrophies() {
    console.log('Loading trophies for player:', this.playerId());
    
    // Reset state using signals
    this.loading.set(true);
    this.error.set(null);
    this.playerData.set(null); // Clear previous data
    
    this.playerService.getPlayers(this.playerId()).subscribe({
      next: (data: player) => {
        console.log('Player trophies received:', data);
        this.playerData.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching player trophies:', err);
        this.error.set('Failed to load player trophies. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  getCountryFlag(country: Country): string {
    const flagMap: { [key in Country]: string } = {
      [Country.Europe]: '🇪🇺',
      [Country.Germany]: '🇩🇪',
      [Country.Poland]: '🇵🇱',
      [Country.Spain]: '🇪🇸',
      [Country.World]: '🌍',
      [Country.Holland]: '🇳🇱',
      [Country.Italy]: '🇮🇹',
      [Country.England]: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      [Country.Denmark]: '🇩🇰',
      [Country.Croatia]: '🇭🇷',
      [Country.Portugal]: '🇵🇹',
    };
    return flagMap[country] || '🏆';
  }

  getTrophyIcon(place: Place): string {
    return place === Place.Winner ? '🏆' : '🥈';
  }

  goBack() {
    window.history.back();
  }

  retryLoad() {
    this.loadPlayerTrophies();
  }
}