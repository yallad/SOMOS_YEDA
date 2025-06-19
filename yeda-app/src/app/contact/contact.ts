import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    // WhatsApp drag & drop
    const waFloat = this.el.nativeElement.querySelector('.whatsapp-float');
    if (waFloat) {
      let isDragging = false, offsetX = 0, offsetY = 0;
      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        offsetX = e.clientX - waFloat.getBoundingClientRect().left;
        offsetY = e.clientY - waFloat.getBoundingClientRect().top;
        waFloat.style.transition = 'none';
      };
      const onMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          waFloat.style.left = (e.clientX - offsetX) + 'px';
          waFloat.style.top = (e.clientY - offsetY) + 'px';
          waFloat.style.right = 'auto';
          waFloat.style.bottom = 'auto';
          waFloat.style.position = 'fixed';
        }
      };
      const onMouseUp = () => {
        isDragging = false;
        waFloat.style.transition = '';
      };
      this.renderer.listen(waFloat, 'mousedown', onMouseDown);
      this.renderer.listen('window', 'mousemove', onMouseMove);
      this.renderer.listen('window', 'mouseup', onMouseUp);
    }

    // Typewriter animation for h3 and p in contact-side-container
    const typewriterH3 = this.el.nativeElement.querySelector('#typewriter-h3');
    const typewriterP = this.el.nativeElement.querySelector('#typewriter-p');
    const h3Text = '¿Por qué contactarnos?';
    const pText = 'Estamos aquí para ayudarte. Ya sea una consulta, sugerencia o colaboración, tu mensaje es importante para nosotros.';
    let i = 0, j = 0;

    function removeCaret(el: HTMLElement) {
      if (el) el.classList.add('typewriter-done');
    }

    function typeWriterH3() {
      if (typewriterH3 && i <= h3Text.length) {
        typewriterH3.textContent = h3Text.substring(0, i);
        i++;
        setTimeout(typeWriterH3, 60);
      } else if (typewriterP) {
        removeCaret(typewriterH3);
        setTimeout(typeWriterP, 400);
      }
    }
    function typeWriterP() {
      if (typewriterP && j <= pText.length) {
        typewriterP.textContent = pText.substring(0, j);
        j++;
        setTimeout(typeWriterP, 22);
      } else {
        removeCaret(typewriterP);
      }
    }
    typeWriterH3();
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
