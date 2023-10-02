<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Empresa\SaveRequest;
use App\Http\Resources\EmpresaResource;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showAll()
    {
        $empresas = Empresa::all();
        return EmpresaResource::collection($empresas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function save(SaveRequest $request)
    {
        $data = $request->validated();
        $empresa = Empresa::where('cnpj', $data['cnpj'])->first();
        if ($empresa) {
            return response()->json([
                'message' => 'Empresa já cadastrada!'
            ], 401);
        }
        $empresa = Empresa::create($data);
        return new EmpresaResource($empresa);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $empresa = Empresa::where('id_empresa', $id)->first();
        return new EmpresaResource($empresa);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveRequest $request, $id)
    {
        $data = $request->validated();

        $empresa = Empresa::findOrFail($id);
        $empresa->update($data);
        return new EmpresaResource($empresa);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $empresa = Empresa::findOrFail($id);
        $empresa->delete();
        return new EmpresaResource($empresa);
    }
}
