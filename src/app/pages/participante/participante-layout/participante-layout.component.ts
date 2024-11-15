import { Component } from '@angular/core';
import {FooterComponent} from "../../../shared/components/footer/footer.component";
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-participante-layout',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent,
        RouterOutlet
    ],
  templateUrl: './participante-layout.component.html',
  styleUrl: './participante-layout.component.css'
})
export class ParticipanteLayoutComponent {

}
