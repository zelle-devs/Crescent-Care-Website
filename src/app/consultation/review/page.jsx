import { Suspense } from "react";
import BookingSystem from '@/components/Consultation/BookingSystem';
import LoadingSpinner from "@/components/Consultation/LoadingSpinner";
import Loader from "@/components/Loader/Loader";

export default function ReviewPage() {
   return (
          <Suspense fallback={<Loader/>}>
              <BookingSystem />
          </Suspense>
      );
}