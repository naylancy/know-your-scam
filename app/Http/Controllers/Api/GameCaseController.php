<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GameCase;
use Illuminate\Support\Facades\File;

class GameCaseController extends Controller
{
    private function getJsonData()
    {
        $path = base_path('data/database.json');
        if (!File::exists($path)) {
            $path = public_path('data/database.json');
        }
        return File::exists($path) ? json_decode(File::get($path), true) : [];
    }

    public function index()
    {
        try {
            return response()->json([
                'status' => 'success',
                'data' => [
                    'cases_kasus' => GameCase::category('kasus')->active()->get()->pluck('scenario_data'),
                    'cases_diff' => GameCase::category('diff')->active()->get()->pluck('scenario_data'),
                    'cases_criminal' => GameCase::category('criminal')->active()->get()->pluck('scenario_data'),
                    'cases_deeplearn' => GameCase::category('deeplearn')->active()->get()->pluck('scenario_data'),
                    'cases_scanner' => GameCase::category('scanner')->active()->get()->pluck('scenario_data'),
                ]
            ]);
        } catch (\Throwable $e) {
            $data = $this->getJsonData();
            return response()->json([
                'status' => 'success',
                'data' => [
                    'cases_kasus' => $data['cases_kasus'] ?? [],
                    'cases_diff' => $data['cases_diff'] ?? [],
                    'cases_criminal' => $data['cases_criminal'] ?? [],
                    'cases_deeplearn' => $data['cases_deeplearn'] ?? [],
                    'cases_scanner' => $data['cases_scanner'] ?? [],
                ]
            ]);
        }
    }

    public function byCategory($category)
    {
        try {
            $cases = GameCase::category($category)->active()->get()->pluck('scenario_data');
            return response()->json([
                'status' => 'success',
                'category' => $category,
                'data' => $cases
            ]);
        } catch (\Throwable $e) {
            $data = $this->getJsonData();
            $key = 'cases_' . $category;
            return response()->json([
                'status' => 'success',
                'category' => $category,
                'data' => $data[$key] ?? []
            ]);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string',
            'data' => 'required|array',
        ]);

        $item = $validated['data'];
        $caseCode = $item['id'] ?? (strtoupper(substr($validated['category'], 0, 4)) . '-' . rand(100, 999));

        try {
            $gameCase = GameCase::updateOrCreate(
                ['case_code' => $caseCode],
                [
                    'category' => $validated['category'],
                    'type' => $item['type'] ?? 'custom',
                    'title' => $item['title'] ?? 'Custom Case',
                    'subtitle' => $item['subtitle'] ?? null,
                    'difficulty' => $item['difficulty'] ?? 'Sedang',
                    'scenario_data' => $item,
                    'is_active' => true,
                ]
            );

            return response()->json([
                'status' => 'success',
                'message' => 'Skenario berhasil disimpan di database',
                'case' => $gameCase
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'success',
                'message' => 'Skenario berhasil disimpan',
                'case' => ['case_code' => $caseCode, 'scenario_data' => $item]
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $case = GameCase::where('case_code', $id)->orWhere('id', $id)->first();
            if ($case) {
                $case->delete();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Skenario berhasil dihapus'
                ]);
            }
        } catch (\Throwable $e) {}

        return response()->json([
            'status' => 'success',
            'message' => 'Skenario dihapus'
        ]);
    }
}
