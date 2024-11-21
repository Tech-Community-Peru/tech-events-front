import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-inscription',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, FooterComponent],
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css']
  })

  export class PerfilComponent implements OnInit {
    ngOnInit(): void {
    }
  }