import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { mockNewborns } from '../data/mockData';
import { CheckCircle, XCircle, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function Triage() {
  const [rnCode, setRnCode] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');

  const handleSearch = () => {
    const patient = mockNewborns.find(p => p.rnCode === rnCode);
    if (patient) {
      setSelectedPatient(patient);
    } else {
      alert('Patient not found. Please verify the RN code.');
      setSelectedPatient(null);
    }
  };

  const handleApprove = () => {
    if (!selectedPatient) return;
    const internalControl = `IC${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    alert(`Sample approved!\nInternal Control Generated: ${internalControl}`);
    setSelectedPatient(null);
    setRnCode('');
  };

  const handleReject = () => {
    if (!rejectionReason) {
      alert('Please select a reason for rejection');
      return;
    }
    alert(`Recollection request sent!\nReason: ${rejectionReason}\nNotes: ${rejectionNotes}`);
    setShowRejectModal(false);
    setSelectedPatient(null);
    setRnCode('');
    setRejectionReason('');
    setRejectionNotes('');
  };

  return (
    <div className="max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Search */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Reception</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rnCode">Scan or Enter 12-Digit RN Code</Label>
              <div className="flex gap-2">
                <Input
                  id="rnCode"
                  value={rnCode}
                  onChange={(e) => setRnCode(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="202603150001"
                  maxLength={12}
                  className="font-mono text-lg"
                />
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {!selectedPatient && (
              <div className="text-center py-12 text-gray-400">
                <Beaker className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter RN code to pull up patient data</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Side - Validation */}
        <Card className={selectedPatient ? 'border-2 border-blue-200' : ''}>
          <CardHeader>
            <CardTitle>Sample Validation</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Info */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-xs text-blue-600 font-medium">RN CODE</p>
                    <p className="font-mono text-lg font-bold text-blue-900">{selectedPatient.rnCode}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 font-medium">Newborn</p>
                      <p className="text-blue-900">{selectedPatient.name}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Mother</p>
                      <p className="text-blue-900">{selectedPatient.motherName}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Date of Birth</p>
                      <p className="text-blue-900">
                        {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Collection Date</p>
                      <p className="text-blue-900">
                        {selectedPatient.collectionDate
                          ? new Date(selectedPatient.collectionDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Collection Unit</p>
                      <p className="text-blue-900">{selectedPatient.collectionUnit || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 font-medium">Weight</p>
                      <p className="text-blue-900">{selectedPatient.weight}g</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg"
                  >
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Approve Sample (Generate Internal Control)
                  </Button>
                  <Button
                    onClick={() => setShowRejectModal(true)}
                    variant="destructive"
                    className="w-full h-14 text-lg"
                  >
                    <XCircle className="w-6 h-6 mr-2" />
                    Reject Sample (Request Recollection)
                  </Button>
                </div>

                {/* Sample Quality Checklist */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-sm mb-3">Quality Checklist:</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span>Filter paper properly saturated</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span>Sample completely dried</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span>No contamination visible</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-blue-600" />
                      <span>RN code legible and correct</span>
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p>No sample selected</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rejection Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request New Sample (Recoleta)</DialogTitle>
            <DialogDescription>
              {selectedPatient && (
                <span>
                  Patient: {selectedPatient.name} - RN Code: {selectedPatient.rnCode}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Reason for Non-conformity *</Label>
              <Select value={rejectionReason} onValueChange={setRejectionReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insufficient">Insufficient blood sample</SelectItem>
                  <SelectItem value="contaminated">Sample contaminated</SelectItem>
                  <SelectItem value="not-dried">Sample not properly dried</SelectItem>
                  <SelectItem value="damaged">Filter paper damaged</SelectItem>
                  <SelectItem value="incorrect-code">Incorrect RN code</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Additional Observations</Label>
              <Textarea
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                placeholder="Enter any additional notes..."
                rows={4}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowRejectModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                Confirm Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Beaker({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </svg>
  );
}
