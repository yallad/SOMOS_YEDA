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
    private fb: FormBuilder,
    private renderer: Renderer2,
    private el: ElementRef
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

      fetch('https://script.google.com/macros/s/AKfycbx6BbofOTCyzH-YGdTG-fT88DpDAc4yha2XXTuwqDAR7HWGbZ31xYbvrCITPT-M56rV/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        mode: 'no-cors' // ⛔ no permite ver respuesta, pero sí enviar
      })
        .then(() => {
          // ✅ Asumimos éxito y mostramos mensaje
          this.success = true;
          this.contactForm.reset();
          this.submitted = false;

          // Muestra ventana emergente
          alert('✅ ¡Mensaje enviado con éxito!');

          // Oculta el mensaje visual si lo usas en HTML
          setTimeout(() => this.success = false, 4000);
        })
        .catch(error => {
          console.error('❌ Error al enviar al Web App de Google Sheets:', error);
          alert('❌ Error al enviar. Intenta más tarde.');
        });
    }
  }

  ngAfterViewInit() {
    const waFloat = this.el.nativeElement.querySelector('.whatsapp-float');
    if (waFloat) {
      let isDragging = false, offsetX = 0, offsetY = 0, moved = false;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        moved = false;
        offsetX = e.clientX - waFloat.getBoundingClientRect().left;
        offsetY = e.clientY - waFloat.getBoundingClientRect().top;
        waFloat.style.transition = 'none';
        waFloat.style.pointerEvents = 'none';
        document.body.style.userSelect = 'none';
      };

      const onMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          moved = true;
          const iconWidth = waFloat.offsetWidth;
          const iconHeight = waFloat.offsetHeight;
          const maxLeft = window.innerWidth - iconWidth;
          const maxTop = window.innerHeight - iconHeight;
          let left = e.clientX - offsetX;
          let top = e.clientY - offsetY;
          left = Math.max(0, Math.min(left, maxLeft));
          top = Math.max(0, Math.min(top, maxTop));
          waFloat.style.left = left + 'px';
          waFloat.style.top = top + 'px';
          waFloat.style.right = 'auto';
          waFloat.style.bottom = 'auto';
          waFloat.style.position = 'fixed';
        }
      };

      const onMouseUp = () => {
        if (isDragging) {
          waFloat.style.transition = '';
          waFloat.style.pointerEvents = '';
          document.body.style.userSelect = '';
          if (!moved) waFloat.click();
        }
        isDragging = false;
        moved = false;
      };

      this.renderer.listen(waFloat, 'mousedown', onMouseDown);
      this.renderer.listen('window', 'mousemove', onMouseMove);
      this.renderer.listen('window', 'mouseup', onMouseUp);
    }

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
