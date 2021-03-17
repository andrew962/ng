import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './modules/matmodule/material.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    LoginComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  public static forRoot(appName: string): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [{
        provide: 'appName', useValue: appName
      }]
    }
  }
}
