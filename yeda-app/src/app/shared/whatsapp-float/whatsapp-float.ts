import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './whatsapp-float.html',
  styleUrls: ['./whatsapp-float.css']
})
export class WhatsappFloat {
  isOpen = false;
  message = '';

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private iconElement!: HTMLElement;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendToWhatsApp() {
    if (this.message.trim()) {
      const encodedMsg = encodeURIComponent(this.message);
      const phone = '57342035583';
      window.open(`https://wa.me/${phone}?text=${encodedMsg}`, '_blank');
      this.isOpen = false;
      this.message = '';
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.iconElement = document.getElementById('whatsapp-icon')!;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.offsetX = clientX - this.iconElement.offsetLeft;
    this.offsetY = clientY - this.iconElement.offsetTop;
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.stopDrag);
    document.addEventListener('touchmove', this.onDrag);
    document.addEventListener('touchend', this.stopDrag);
  }

  onDrag = (event: MouseEvent | TouchEvent) => {
    if (!this.isDragging || !this.iconElement) return;
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    this.iconElement.style.left = `${clientX - this.offsetX}px`;
    this.iconElement.style.top = `${clientY - this.offsetY}px`;
    this.iconElement.style.right = 'unset';
    this.iconElement.style.bottom = 'unset';
  };

  stopDrag = () => {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
    document.removeEventListener('touchmove', this.onDrag);
    document.removeEventListener('touchend', this.stopDrag);
  };
}
