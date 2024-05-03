import { CallMeService } from './services/CallMe'
import { ComponentService } from './services/Component'
import { EmployeeService } from './services/Employee'
import { ModelService } from './services/Model'
import { OrderService } from './services/Order'
import { QualityService } from './services/Quality'
import { ServiceService } from './services/Service'

export const Api = {
  CallMe: new CallMeService(),
  Component: new ComponentService(),
  Employee: new EmployeeService(),
  Model: new ModelService(),
  Order: new OrderService(),
  Quality: new QualityService(),
  Service: new ServiceService(),
}
