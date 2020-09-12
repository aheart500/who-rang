export interface SearchState {
  value: string;
  type: 'number' | 'name';
}
export interface SearchProps {
  state: SearchState;
  setState: (searchState: SearchState) => void;
  handleSearch: () => void;
}
export interface PhoneNumber {
  name: string;
  number: string;
}
