from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import psutil
import shutil

from rest_framework.views import APIView
from rest_framework.response import Response


class StatsView(APIView):

    def get_disk_usage(self):
        disk_tuple = shutil.disk_usage("/")
        disk_pct = 100 * (disk_tuple[1] / disk_tuple[0])
        return round(disk_pct, 1)


    def get(self, request, *args, **kwargs):

        if 'items' in self.request.query_params:
            out_obj = {}
            items = self.request.query_params['items'].split(',')
            
            if 'cpu' in items:
                out_obj['cpu_pct'] = psutil.cpu_percent()
            
            if 'ram' in items:
                out_obj['ram_pct'] = psutil.virtual_memory()[2]

            if 'disk' in items:
                out_obj['disk-pct'] = self.get_disk_usage()
                
        else:
            out_obj = {
                'cpu_pct': psutil.cpu_percent(),
                'ram_pct': psutil.virtual_memory()[2],
                'disk_pct': self.get_disk_usage(),
            }

        return Response(out_obj)