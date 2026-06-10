import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true, // ✅ Activamos Standalone
  imports: [
    CommonModule,
    FormsModule,
    IonicModule // ✅ Añadimos los módulos básicos para su HTML
  ]
})
export class InfoPage {}