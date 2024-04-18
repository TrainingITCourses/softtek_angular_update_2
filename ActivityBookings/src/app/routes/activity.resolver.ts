import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ActivitiesRepository } from '../shared/activities.repository';

export const activityResolver: ResolveFn<any> = (route, state) => {
  const id: string | null = route.paramMap.get('id');
  if (!id) {
    return null;
  }
  const activitiesService = inject(ActivitiesRepository);
  return activitiesService.getById$(id);
};
