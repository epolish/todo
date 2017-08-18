import { ElementRef, Renderer } from '@angular/core';
import { FocusDirective } from './focus.directive';

describe('FocusDirective', () => {
  let directive;
  
  beforeEach(() => {
    directive = new FocusDirective(null, null);
  });
  
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
  
  it('should call ngOnInit', () => {
    spyOn(directive, 'ngOnInit').and.callThrough();
  });
  
  it('should has no focusEvent', () => {
    expect(directive.focusEvent).not.toBeDefined(); 
  });

});
