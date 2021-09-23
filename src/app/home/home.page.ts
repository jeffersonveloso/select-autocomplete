import { Component } from '@angular/core';
import { SelectionType } from 'src/interfaces/shared-enums.enum';
import { SimulateRequestsService } from 'src/services/simulate-requests.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  inputClientsConfig = {
    labelInput: 'Clientes',
    searchText: '',
    showResults: false,
    dataName: 'Clients',
    properties: { text: 'tradingName', value: 'id' },
    func: () => this.findClients(),
    selectionType: SelectionType.SINGLE,
    selected: [],
    data: [],
    page: 1,
    totalOfPages: null,
    limit: 30,
  };

  inputPaymentsConfig = {
    labelInput: 'Método de pagamento',
    searchText: '',
    showResults: false,
    dataName: 'PaymentsMethod',
    properties: { text: 'description', value: 'id' },
    func: () => this.findPaymentMethods(),
    selectionType: SelectionType.SINGLE,
    selected: [],
    data: [],
    page: 1,
    totalOfPages: null,
    limit: 30,
  };

  //Faz parte da criação do component select-searchable
  constructor(private simulateReqService: SimulateRequestsService) {}

  async findClients() {
    try {
      const { data, pages } = await this.simulateReqService.findClients({
        searchText: this.inputClientsConfig.searchText,
        companyId: 183,
        limit: this.inputClientsConfig.limit,
        page: this.inputClientsConfig.page,
      });

      this.inputClientsConfig.totalOfPages = pages;
      this.inputClientsConfig.data = this.inputClientsConfig.data.concat(data);

      this.inputClientsConfig.showResults = true;
    } catch (error) {
      throw error;
    }
  }

  async findPaymentMethods() {
    try {
      const { data, pages } = await this.simulateReqService.findPaymentMethods({
        searchText: this.inputPaymentsConfig.searchText,
        companyId: 183,
        limit: this.inputPaymentsConfig.limit,
        page: this.inputPaymentsConfig.page,
      });

      this.inputPaymentsConfig.totalOfPages = pages;
      this.inputPaymentsConfig.data =
        this.inputPaymentsConfig.data.concat(data);

      this.inputPaymentsConfig.showResults = true;
    } catch (error) {
      throw error;
    }
  }
}
