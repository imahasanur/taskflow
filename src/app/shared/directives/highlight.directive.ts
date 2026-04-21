import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight') searchTerm = '';
  @Input() originalText = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    const text = this.originalText || this.el.nativeElement.textContent;
    if (!this.searchTerm) {
      this.el.nativeElement.innerHTML = text;
      return;
    }
    const escaped = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    this.el.nativeElement.innerHTML = text.replace(
      regex,
      '<mark class="highlight">$1</mark>'
    );
  }
}
