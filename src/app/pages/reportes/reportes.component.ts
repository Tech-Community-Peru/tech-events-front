import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ReportesService, RegistroEscaneoDTO } from '../../core/service/reportes.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent {
  reportesForm: FormGroup;
  totalEscaneosEvento: number | null = null;
  totalEscaneosParticipante: number | null = null;
  detallesEscaneos: RegistroEscaneoDTO[] = [];
  private chart!: Chart;

  private reportesService = inject(ReportesService);
  private fb = inject(FormBuilder);

  constructor() {
    Chart.register(...registerables); // Registrar componentes de Chart.js
    this.reportesForm = this.fb.group({
      eventoId: ['', Validators.required],
      participanteId: ['', Validators.required],
    });
  }

  consultarEscaneosPorEvento(): void {
    const eventoId = this.reportesForm.get('eventoId')?.value;
    if (eventoId) {
      this.reportesService.obtenerTotalEscaneosPorEvento(eventoId).subscribe((total) => {
        this.totalEscaneosEvento = total;
        this.generarGraficoBarra(total, 'Escaneos por Evento');
      });
    }
  }

  consultarEscaneosPorParticipante(): void {
    const participanteId = this.reportesForm.get('participanteId')?.value;
    if (participanteId) {
      this.reportesService.obtenerTotalEscaneosPorParticipante(participanteId).subscribe((total) => {
        this.totalEscaneosParticipante = total;
        this.generarGraficoCircular(total, 'Escaneos por Participante');
      });
    }
  }

  listarEscaneosPorEvento(): void {
    const eventoId = this.reportesForm.get('eventoId')?.value;
    if (eventoId) {
      this.reportesService.obtenerEscaneosPorEvento(eventoId).subscribe((detalles) => {
        this.detallesEscaneos = detalles;
      });
    }
  }

  generarGraficoBarra(valor: number, etiqueta: string): void {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('grafico', {
      type: 'bar',
      data: {
        labels: [etiqueta],
        datasets: [
          {
            label: etiqueta,
            data: [valor],
            backgroundColor: ['#705CDF'],
          },
        ],
      },
    });
  }

  generarGraficoCircular(valor: number, etiqueta: string): void {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('grafico', {
      type: 'doughnut',
      data: {
        labels: [etiqueta, 'Resto'],
        datasets: [
          {
            label: etiqueta,
            data: [valor, 100 - valor], // Ejemplo: Asegura que el gráfico tenga más de un valor
            backgroundColor: ['#705CDF', '#DADADA'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    } as unknown as ChartConfiguration);
  }
  
}
