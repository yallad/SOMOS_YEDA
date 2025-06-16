import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  imports: [CommonModule],
  styleUrls: ['./about.css']
})
export class About implements AfterViewInit {
  @ViewChildren('teamMember') members!: QueryList<ElementRef>;
  current = 0;

  team = [
    {
      name: 'dallay',
      description: 'Desarrolladora Frontend experta en Angular y experiencias de usuario atractivas.',
      img: 'assets/images/member1.jpg',
      instagram: '#',
      linkedin: '#'
    },
    {
      name: 'debie',
      description: 'Apasionada por la accesibilidad web y las interfaces responsivas.',
      img: 'assets/images/member2.jpg',
      instagram: '#',
      linkedin: '#'
    },
    {
      name: 'yerika',
      description: 'Especialista en integraciones y consumo de APIs RESTful.',
      img: 'assets/images/member3.jpg',
      instagram: '#',
      linkedin: '#'
    },
    {
      name: 'yus',
      description: 'Lidera el desarrollo con metodologías ágiles y gestión de proyectos.',
      img: 'assets/images/member4.jpg',
      instagram: '#',
      linkedin: '#'
    },
    {
      name: 'Yerika ',
      description: 'Especialista en experiencia de usuario y branding digital. Creadora de YEDA.',
      img: 'assets/images/member5.jpg',
      instagram: '#',
      linkedin: '#'
    }
  ];

  ngAfterViewInit() {
    this.showMember(this.current);
  }

  showMember(index: number) {
    this.members.forEach((member, i) => {
      if (i === index) {
        member.nativeElement.classList.add('active');
      } else {
        member.nativeElement.classList.remove('active');
      }
    });
  }

  prev() {
    this.current = (this.current - 1 + this.members.length) % this.members.length;
    this.showMember(this.current);
  }

  next() {
    this.current = (this.current + 1) % this.members.length;
    this.showMember(this.current);
  }
}
