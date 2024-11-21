import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    RouterLink, CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './update-profile-ponente.component.html',
  styleUrl: './update-profile-ponente.component.css'
})
export class UpdateProfilePonenteComponent {

}
