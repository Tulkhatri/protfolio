<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception, Validator, DB;
use App\Models\Skill;
use Carbon\Carbon;
use Illuminate\Database\QueryException;

class SkillController extends Controller
{
    protected $nosave;
    protected $queryMessage;
    protected $type;
    protected $message;
    protected $response;

    protected $nouser;
    protected $nodelete;

    // Constructor
    public function __construct()
    {
        // parent::__construct();
        $this->nosave="Data does not save";
        $this->queryMessage="Data base error";
        
        $this->type="success";
        $this->message="";
        $this->response =false;
    }


    // Store
    public function store (Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'title' => [
                    'required',
                    'string',
                    'max:250',
                    
                ],
                'description' => [
                    'required',
                    'string',
                    'max:250',
                ]
            ], [
                'title.required' => 'Required',
                'title.unique' => 'Already Exist',
            ],
            [
                'description.required' => 'Required',
                'description.unique' => 'Already Exist',
            ]
        
        );
            if ($validate->fails())
                throw new Exception ($validate->errors()->first(), 1);

            $post = $request->all();
            $this->message = 'Record Added';

            DB::beginTransaction();
            $type = !empty($post['edit_id']) ? Skill::where('id', $post['edit_id'])->where('status', 'Y')->first() : new Skill;
            $type->title = $post['title'];
            $type->description = $post['description'];
            if (!empty($post['file'])) {
                $extension = $post['file']->getClientOriginalExtension();
                if (!in_array($extension, ['png', 'jpeg', 'jpg'])) {
                    throw new Exception ('फाइल ढाँचा समर्थित छैन। कृपया (PNG/JPEG/JPG) फाइलहरू मात्र अपलोड गर्नुहोस्।', 1);
                }
                $fileName = $post['file']->getClientOriginalName();
                $arrayData = explode('.', $fileName);
                $strippedStr = str_replace([' ', "\t", "\n", "\r"], '', $arrayData[0] );
                $tempName = $strippedStr . time() . '.' . $extension;
                $storeFile = $request->file('file')->storeAs('skill', $tempName, 'public');
                if (empty($storeFile)) {
                    throw new Exception ('no save', 1);
                }
                 $type->file= $tempName;
            } else {
                 $type->file = 'no file';
            }

            $result = $type->save();
            if (!$result)
                throw new Exception ($this->nosave, 1);

            $this->response = true;
            DB::commit();

        } catch (QueryException $e)  {
            DB::rollback();
            $this->type = 'error';
            $this->message = $this->queryMessage;
        } catch (Exception $e) {
            DB::rollback();
            $this->type = 'error';
            $this->message = $e->getMessage();
        }
        return json_encode(['type' => $this->type, 'message' => $this->message, 'response' => $this->response]);
    }


    // Get list
    public function getList ()
    {
        try {
            $this->message = 'Fetched All skills';
            $result = Skill::where('status', 'Y')->orderBy('id', 'DESC')->get();
            $dataArray = [];


            $i = 1;
            foreach ($result as $row) {
                $dataArray[] = [
                    'sn' => $i++,
                    'id' => $row->id,
                    'title' => $row->title,
                    'description' => $row->description,
                    'file' => $row->file
                ];
            }

            $this->response = $dataArray;
        } catch (QueryException $e)  {
            $this->type = 'error';
            $this->message = $this->queryMessage;
        } catch (Exception $e) {
            $this->type = 'error';
            $this->message = $e->getMessage();
        }
        return json_encode(['type' => $this->type, 'message' => $this->message, 'response' => $this->response]);
    }




    // Get data
    public function getData (Request $request)
    {
        try {

            $this->message = 'Fetch Single Data';
            $validate = Validator::make($request->all(), [
                'id' => 'required|numeric'
            ], [
                'id.required' => 'Id is Required'
            ]);
            if ($validate->fails())
                throw new Exception ($validate->errors()->first(), 1);

            $post = $request->all();
            $type = Skill::where('id', $post['id'])->where('status', 'Y')->orderBy('id', 'DESC')->first();
            if (!$type)
                throw new Exception ($this->nodata, 1);

            $data = [
                'edit_id' => $type->id,
                'title' => $type->title,
                'description' => $type->description,
                'file' => $type->file,

            ];

       

            $this->response = $data;

        } catch (QueryException $e)  {
            $this->type = 'error';
            $this->message = $e->getMessage(); //$this->queryMessage;
        } catch (Exception $e) {
            $this->type = 'error';
            $this->message = $e->getMessage();
        }
        return json_encode(['type' => $this->type, 'message' => $this->message, 'response' => $this->response]);
    }





    // Delete
    public function delete (Request $request)
    {
        try {

            $post = $request->all();
            $this->message = 'Record Deleted';

            $validate = Validator::make($request->all(), [
                'id' => 'required|numeric'
            ], [
                'id.required' => 'Id Required'
            ]);
            if ($validate->fails())
                throw new Exception ($validate->errors()->first(), 1);

            DB::beginTransaction();
            $updateArray = [
                'status' => 'N',
            ];
            $isChanged = Skill::where('id', $post['id'])->where('status', 'Y')->update($updateArray);
            if (!$isChanged)
                throw new Exception ($this->nodelete, 1);

            $this->response = true;
            DB::commit();

        } catch (QueryException $e)  {
            DB::rollback();
            $this->type = 'error';
            $this->message = $this->queryMessage;
        } catch (Exception $e) {
            DB::rollback();
            $this->type = 'error';
            $this->message = $e->getMessage();
        }
        return json_encode(['type' => $this->type, 'message' => $this->message, 'response' => $this->response]);
    }


}
