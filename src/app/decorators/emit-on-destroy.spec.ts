import { OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { EmitOnDestroy } from './emit-on-destroy';

describe('@EmitOnDestroy Decorator', () => {

  class FakeComponent implements OnInit, OnDestroy {

    @EmitOnDestroy()
    public destroy$;

    ngOnInit(): void {}
    ngOnDestroy(): void {}
  }

  class FakeComponentWithDecoratorOptions {

    @EmitOnDestroy({
      initialize: 'customInit',
      terminate: 'customDestroy'
    })
    public destroy$;

    customInit(): void {}
    customDestroy(): void {}
  }

  describe('default', () => {
    let fakeComponent;

    beforeEach(() => {
      fakeComponent = new FakeComponent();
    });
  
    it('should initialize a ReplaySubject if ngOnInit is called', () => {
      fakeComponent.ngOnInit();
      expect(fakeComponent.destroy$ instanceof ReplaySubject).toBe(true);
    });
  
    it('should emit and complete the ReplaySubject if ngOnDestroy is called', () => {
      fakeComponent.ngOnInit();
      const nextSpy = spyOn(fakeComponent.destroy$, 'next');
      const completeSpy = spyOn(fakeComponent.destroy$, 'complete');
      fakeComponent.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
  
  describe('with options', () => {
    let fakeComponent;
    
    beforeEach(() => {
      fakeComponent = new FakeComponentWithDecoratorOptions();
    });

    it('should initialize a ReplaySubject if a lifecycle function "customInit" \
    (which was passed through decorator configuration) is called', () => {
      fakeComponent.customInit();
      expect(fakeComponent.destroy$ instanceof ReplaySubject).toBe(true);
    });

    it('should emit and complete the ReplaySubject if a lifecycle function "customDestory", \
    (which was passed through decorator configuration) is called', () => {
      fakeComponent.customInit();
      const nextSpy = spyOn(fakeComponent.destroy$, 'next');
      const completeSpy = spyOn(fakeComponent.destroy$, 'complete');
      fakeComponent.customDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

});
