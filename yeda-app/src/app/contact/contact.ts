import { Component, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
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

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.success = true;
      this.contactForm.reset();
      setTimeout(() => this.success = false, 4000);
    }
  }

  ngAfterViewInit() {
    // WhatsApp drag & drop
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
          const minLeft = 0;
          const minTop = 0;
          const maxLeft = window.innerWidth - iconWidth;
          const maxTop = window.innerHeight - iconHeight;
          let left = e.clientX - offsetX;
          let top = e.clientY - offsetY;
          left = Math.max(minLeft, Math.min(left, maxLeft));
          top = Math.max(minTop, Math.min(top, maxTop));
          waFloat.style.left = left + 'px';
          waFloat.style.top = top + 'px';
          waFloat.style.right = 'auto';
          waFloat.style.bottom = 'auto';
          waFloat.style.position = 'fixed';
        }
      };
      const onMouseUp = (e: MouseEvent) => {
        if (isDragging) {
          waFloat.style.transition = '';
          waFloat.style.pointerEvents = '';
          document.body.style.userSelect = '';
          if (!moved) {
            waFloat.click();
          }
        }
        isDragging = false;
        moved = false;
      };
      this.renderer.listen(waFloat, 'mousedown', onMouseDown);
      this.renderer.listen('window', 'mousemove', onMouseMove);
      this.renderer.listen('window', 'mouseup', onMouseUp);
    }

    // Mini video play/pause logic
    const video: HTMLVideoElement | null = this.el.nativeElement.querySelector('#miniVideo');
    const btn: HTMLButtonElement | null = this.el.nativeElement.querySelector('#playPauseBtn');
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
        btn.textContent = '▶';});
    }
  }
}