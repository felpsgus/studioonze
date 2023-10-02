@extends('app')
@section('content')
        <div class="d-flex justify-content-between">
            <h1>Dados</h1>
            <a class="btn btn-primary d-inline align-self-center" href="{{route('home')}}" role="button">Voltar</a>
        </div>
        <br>
        <form action="{{route('save')}}" method="post">
        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        @csrf
            <div class="row">
                @if (isset($response['idAdress']))
                <input type="hidden" id="idAdress" name="idAdress" value="{{$response['idAdress']}}">
                @endif
                <div class="col-md-2 mb-3">
                    <label for="postalCode" class="form-label">Cep</label>
                    <input type="text" class="form-control" id="postalCode" name="postalCode" value="{{$response['postalCode']}}">
                </div>
                <div class="col-md-6 mb-3">
                    <label for="street" class="form-label">Logradouro</label>
                    <input type="text" class="form-control" id="street" name="street" value="{{$response['street']}}">
                </div>
                <div class="col-md-1 mb-3">
                    <label for="number" class="form-label">Número</label>
                    <input type="text" class="form-control" id="number" name="number" value="{{$response['number']}}">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="neighborhood" class="form-label">Bairro</label>
                    <input type="text" class="form-control" id="neighborhood" name="neighborhood" value="{{$response['neighborhood']}}">
                </div>
            </div>
            <div class="row">
                <div class="col-md-8 mb-3">
                    <label for="complement" class="form-label">Complemento</label>
                    <input type="text" class="form-control" id="complement" name="complement" value="{{$response['complement']}}">
                </div>
                <div class="col-md-3 mb-3">
                    <label for="city" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="city" name="city" value="{{$response['city']}}">
                </div>
                <div class="col-md-1 mb-3">
                    <label for="state" class="form-label">Uf</label>
                    <input type="text" class="form-control" id="state" name="state" value="{{$response['state']}}">
                </div>
            </div>
        <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
@endsection
