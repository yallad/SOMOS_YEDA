import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact implements AfterViewInit {
  contactForm: FormGroup;
  submitted = false;
  success = false;

  @ViewChild('miniVideo', { static: false }) miniVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('playPauseBtn', { static: false }) playPauseBtnRef!: ElementRef<HTMLButtonElement>;
  isPlaying = false;

  constructor(
    private  readonly fb: FormBuilder,
    private readonly renderer: Renderer2,
    private  readonly el: ElementRef
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      console.log("📤 Enviando datos a Google Sheets:", formData);

      fetch('https://script.google.com/macros/s/AKfycbzeMbyprXkO22xfGe_XQuFtn5TghGEQQB7VqwXwmtp38H3XxfhgZOH5MP-PJ4hBAID8SA/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        mode: 'no-cors'
      })
        .then(() => {
          this.success = true;
          this.contactForm.reset();
          this.submitted = false;
          alert(' ¡Mensaje enviado con éxito!');
          setTimeout(() => this.success = false, 4000);
        })
        .catch(error => {
          console.error('❌ Error al enviar al Web App de Google Sheets:', error);
          alert('❌ Error al enviar. Intenta más tarde.');
        });
    }
  }

  ngAfterViewInit() {
    const video = this.el.nativeElement.querySelector('#miniVideo');
    const btn = this.el.nativeElement.querySelector('#playPauseBtn');
    if (video && btn) {
      btn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          btn.textContent = '❚❚';
        } else {
          video.pause();
          btn.textContent = '▶';
        }
      });

      video.addEventListener('click', () => {
        if (!video.paused) {
          video.pause();
          btn.textContent = '▶';
        }
      });

      video.addEventListener('play', () => {
        btn.textContent = '❚❚';
      });

      video.addEventListener('pause', () => {
        btn.textContent = '▶';
      });
    }
  }
}
