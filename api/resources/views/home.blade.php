@extends('app')
@section('content')
        <h1>Home</h1>
        <br>
        @if(session('success'))
            <div class="alert alert-success alert-dismissible" role="alert">
                {{session('success')}}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif
        <form action="{{route('search')}}" method="get">
            <div class="row">
                <div class="col-md-4 mb-3">
                    <div class="input-group">
                        <label for="postalCode" class="input-group-text">Cep</label>
                        <input type="text" class="form-control" id="postalCode" name="postalCode">
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <button type="submit"  class="btn btn-primary">Buscar</button>
                </div>
            </div>
        </form>
        <hr>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Cep</th>
                    <th scope="col">Logradouro</th>
                    <th scope="col">Número</th>
                    <th scope="col">Bairro</th>
                    <th scope="col">Complemento</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
                @foreach($adresses as $adress)
                <tr>
                    <td>{{$adress['postalCode']}}</td>
                    <td>{{$adress['street']}}</td>
                    <td>{{$adress['number']}}</td>
                    <td>{{$adress['neighborhood']}}</td>
                    <td>{{$adress['complement']}}</td>
                    <td>{{$adress['city']}}</td>
                    <td>{{$adress['state']}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
@endsection
