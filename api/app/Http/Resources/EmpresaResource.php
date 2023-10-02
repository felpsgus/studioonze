<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmpresaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array(
            "id_empresa" => $this->id_empresa,
            "nome" => $this->nome,
            "cnpj" => $this->cnpj,
            "email" => $this->email,
            "telefone" => $this->telefone,
        );
    }
}
